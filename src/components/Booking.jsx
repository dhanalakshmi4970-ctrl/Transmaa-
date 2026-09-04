import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const createBooking = async () => {
    setLoading(true);
    
    // Get currently authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setStatusMessage('You must be logged in to create a booking.');
      setLoading(false);
      return;
    }

    // Insert new booking using current user's ID
    const { data, error } = await supabase
      .from('bookings')
      .insert([{ user_id: user.id, status: 'pending' }])
      .select();

    if (error) {
      setStatusMessage(`Error: ${error.message}`);
    } else {
      setStatusMessage(`Booking created successfully! ID: ${data[0].id}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto' }}>
      <h3>Create Booking</h3>
      <button onClick={createBooking} disabled={loading}>
        {loading ? 'Creating...' : 'New Booking'}
      </button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}