using System.Drawing;

namespace Monitor.Data.Model
{
    public class LocationIcon
    {
        public int id { get; set; }
        public string name { get; set; }
        public Point locationCoordinate { get; set; }
        public string iconUrl { get; set; }

        public LocationIcon()
        {
            locationCoordinate = new Point(0, 0);
            iconUrl = "icon/green.png";
        }
    }
}
