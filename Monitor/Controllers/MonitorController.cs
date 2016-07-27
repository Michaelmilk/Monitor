using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monitor.Data;
using Monitor.Data.Helper;
using Monitor.Data.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Monitor.Controllers
{
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
        public async Task<IHttpActionResult> SaveIconDisposition(int id, Dictionary<string, object> fc)
        {
            var mapNodeInfo = MapNode.mapNodes[id];
            var hashScheme = ((JArray)fc["hashscheme"]).ToObject<List<LocationIcon>>();
            var absConfigFilePath = Path.Combine(Config.ServerPath, mapNodeInfo.configPath);
            List<LocationIcon> icons = JsonIOHelper.ReadFromJsonFile(absConfigFilePath);
            if (icons == null)
                icons = new List<LocationIcon>();
            icons.AddRange(hashScheme);
            JsonIOHelper.WriteToJsonFile(icons, absConfigFilePath);
            var iconList = await Task.FromResult(icons);
            return Ok(iconList);
        }
    }
}
