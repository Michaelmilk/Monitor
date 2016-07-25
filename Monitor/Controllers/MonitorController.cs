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

namespace Monitor.Controllers
{
    public class MonitorController : ApiController
    {
        [HttpGet]
        [Route("api/monitor/get-map-tree")]
        public async Task<IHttpActionResult> GetMaps()
        {
            var locationMap = await Task.FromResult(MapNode.GetMapTree());
            return Ok(locationMap);
        }

        [HttpPost]
        [Route("api/monitor/save-icon-disposition")]
        public async Task<IHttpActionResult> SaveIconDisposition()
        {
            var locationMap = await Task.FromResult(ScanDirectoryAsJson.GetMapTree());
            return Ok(locationMap);
        }
    }
}
