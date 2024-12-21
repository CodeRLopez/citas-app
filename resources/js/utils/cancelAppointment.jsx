
export const cancelAppointment = async (id) => {
    try{
        const confirmed = confirm('Are you sure you want to cancel?')
        if (confirmed) {
            const newStatus = 'true' ? 'false' : 'true'
            const response = await axios.put(`/appointments/${id}`, {status: newStatus})
            console.log('response', response)
        } else {
            console.log('not canceled')
        }
    } catch (e) {
        console.error('Error:', e)
    }
}
