using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monitor.Data.Helper;
using Monitor.Data.Model;
using Newtonsoft.Json;

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
        public async Task<IHttpActionResult> SaveIconDisposition(int id, List<LocationIcon> locationIcons)
        {
            var mapNodeInfo = MapNode.mapNodes[id];
            List<LocationIcon> icons = JsonIOHelper.ReadFromJsonFile(mapNodeInfo.configPath);
            icons.AddRange(locationIcons);
            JsonIOHelper.WriteToJsonFile(icons, mapNodeInfo.configPath);
            var iconList = await Task.FromResult(icons);
            return Ok(iconList);
        }
    }
}
