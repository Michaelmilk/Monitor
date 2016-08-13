using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monitor.Data.Model
{
    public class SensorData
    {
        public static double normalThreshold = 60;
        public static double preSignal1Threshold = 70;
        public static double preSignal2Threshold = 80;
        public static double preSignal3Threshold = 85;
        public static double alarmThreshold = 90;

        public double threshold;

        public SensorData(double threshold)
        {
            this.threshold = threshold;
        }

        public EventStatus GetSensorEventStatus()
        {
            if (threshold <= preSignal1Threshold)
                return EventStatus.normal;
            if (threshold >= preSignal1Threshold && threshold < preSignal2Threshold)
                return EventStatus.preSignal1 ;
            if (threshold >= preSignal2Threshold && threshold < preSignal3Threshold)
                return EventStatus.preSignal2;
            if (threshold >= preSignal3Threshold && threshold < alarmThreshold)
                return EventStatus.preSignal3;
            if (threshold >= alarmThreshold)
                return EventStatus.alarm;
            return EventStatus.normal;
        }
    }
}
