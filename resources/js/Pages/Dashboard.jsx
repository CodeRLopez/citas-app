import PrimaryButton from '@/Components/PrimaryButton';
import MyCalendar from '@/Components/Schedule/MyCalendar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try{
            const response = await axios.get('/appointments')
            setAppointments(response.data);
        } catch (e) {
            console.error('Error:', e)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10 text-end">
                <PrimaryButton className="mr-8 mb-5" >Create Appointment</PrimaryButton>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {
                                appointments && appointments.length > 0 ?
                                    <MyCalendar appointments={appointments}/>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
