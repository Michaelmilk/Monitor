﻿
namespace Monitor.Data.Model
{
    public class Point
    {
        public int X;
        public int Y;
        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
    public class LocationIcon
    {
        public string mapNodeLabel { get; set; }
        public int mapNodeId { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public Point locationCoordinate { get; set; }
        public string iconUrl { get; set; }
        public SensorStatus status { get; set; }
        public SensorData sensorData { get; set; }
        public LocationIcon()
        {
            locationCoordinate = new Point(0, 0);
            status = new SensorStatus();
            sensorData = new SensorData();
            iconUrl = "icon/green.png";
        }

        public void SetStatus(EventStatus eventStatus)
        {
            status.SetStatus(eventStatus);
        }
    }
}
