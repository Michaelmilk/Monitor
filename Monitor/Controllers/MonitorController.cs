using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monitor.Data.Helper;

namespace Monitor.Controllers
{
    public class MonitorController : ApiController
    {
        [HttpGet]
        [Route("api/monitor/get-location-map")]
        public async Task<IHttpActionResult> GetMaps()
        {
            var locationMap = await Task.FromResult(ScanDirectoryAsJson.GetMapJsonString());
            return Ok(locationMap);
        }
    }
}
