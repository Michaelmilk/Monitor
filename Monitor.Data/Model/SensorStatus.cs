using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
// ReSharper disable InconsistentNaming

namespace Monitor.Data.Model
{
    public enum EventStatus
    {
        normal,
        preSignal1,
        preSignal2,
        preSignal3,
        fault,
        offline,
        alarm
    }

    
    public class SensorStatus
    {
        //member must public, or can't be convert to json
        public EventStatus status;
        public string statusIcon;

        public SensorStatus()
        {
            status = EventStatus.normal;
            statusIcon = @"icon/normal.png";
        }

        public void SetNormal()
        {
            status = EventStatus.normal;
            statusIcon = @"icon/normal.png";
        }

        public void SetAlarm()
        {
            status = EventStatus.alarm;
            statusIcon = @"icon/alarm.png";
        }

        public void SetPreSignal1()
        {
            status = EventStatus.preSignal1;
            statusIcon = @"icon/preSignal1.png";
        }

        public void SetPreSignal2()
        {
            status = EventStatus.preSignal2;
            statusIcon = @"icon/preSignal2.png";
        }

        public void SetPreSignal3()
        {
            status = EventStatus.preSignal3;
            statusIcon = @"icon/preSignal3.png";
        }

        public void SetFault()
        {
            status = EventStatus.fault;
            statusIcon = @"icon/fault.png";
        }

        public void SetOffline()
        {
            status = EventStatus.offline;
            statusIcon = @"icon/offline.png";
        }

        public void SetStatus(EventStatus eventStatus)
        {
            switch (eventStatus)
            {
                case EventStatus.normal:
                    SetNormal();
                    break;
                case EventStatus.alarm:
                    SetAlarm();
                    break;
                case EventStatus.preSignal1:
                    SetPreSignal1();
                    break;
                case EventStatus.preSignal2:
                    SetPreSignal2();
                    break;
                case EventStatus.preSignal3:
                    SetPreSignal3();
                    break;
                case EventStatus.fault:
                    SetFault();
                    break;
                case EventStatus.offline:
                    SetOffline();
                    break;
                default:
                    SetNormal();
                    break;
            }
        }

        public void SetStatus(SensorData sensorData)
        {
            SetStatus(sensorData.GetSensorEventStatus());
        }
    }
}
