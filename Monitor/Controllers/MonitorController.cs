using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Monitor.Data;
using Monitor.Data.Helper;
using Monitor.Data.Model;
using Monitor.Data.Simulation;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Monitor.Controllers
{
    // This allows cross-origin requests from WebClient
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class MonitorController : ApiController
    {
        [HttpGet]
        [Route("api/monitor/get-map-tree")]
        public async Task<IHttpActionResult> GetMaps()
        {
            MapNode.idCount = 0;
            MapNode.mapNodes.Clear();
            var locationMap = await Task.FromResult(MapNode.GetMapTree());
            return Ok(locationMap);
        }

        [HttpPost]
        [Route("api/monitor/save-icon-disposition/{id}")]
        public async Task<IHttpActionResult> SaveIconDisposition(int id, Dictionary<string, object> iconPositionInfo)
        {
            var mapNodeInfo = MapNode.mapNodes[id];
            var newIconList = ((JArray)iconPositionInfo["iconList"]).ToObject<List<LocationIcon>>();
            var absConfigFilePath = Path.Combine(Config.ServerPath, mapNodeInfo.configPath);
            List<LocationIcon> icons = new List<LocationIcon>();
            if (File.Exists(absConfigFilePath))
            {
                icons = JsonIOHelper.ReadFromJsonFile(absConfigFilePath);
            }
            
            icons.AddRange(newIconList);
            JsonIOHelper.WriteToJsonFile(icons, absConfigFilePath);
            var iconList = await Task.FromResult(icons);
            return Ok(iconList);
        }

        [HttpGet]
        [Route("api/monitor/get-sensor-status")]
        public async Task<IHttpActionResult> GetSensorStatus()
        {
            foreach (var mapNode in MapNode.mapNodes)
            {
                foreach (var sensor in mapNode.Value.locationIconList)
                {
                    sensor.status.SetStatus(GenerateSensorData.Generate());
                }
            }

            var mapNodes = await Task.FromResult(MapNode.mapNodes);

            return Ok(mapNodes);
        }
    }
}
