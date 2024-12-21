import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { cancelAppointment } from '@/utils/cancelAppointment';


const localizer = dayjsLocalizer(dayjs)

const MyCalendar = ({ appointments }) => {

    const parsedAppointments = appointments.map((app) => {
        return ({
            ...app,
            start: new Date(app.start),
            end: new Date(app.end),
        });
    });

    console.log('example', parsedAppointments)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={parsedAppointments}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => cancelAppointment(event.id, event.status)}
        style={{ height: 500 }}
      />
    </div>
  )
}

export default MyCalendar
