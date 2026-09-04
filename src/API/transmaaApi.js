const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
}

// =========================
// CUSTOMER
// =========================

export async function loginCustomer(phone) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export async function registerCustomer(customer) {
  return apiRequest("/customers", {
    method: "POST",
    body: JSON.stringify(customer),
  });
}

export async function updateCustomer(
  customerId,
  customer
) {
  return apiRequest(`/customers/${customerId}`, {
    method: "PUT",
    body: JSON.stringify(customer),
  });
}

// =========================
// BOOKINGS
// =========================

export async function createBooking(booking) {
  return apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
  });
}

export async function getCustomerBookings(customerId) {
  return apiRequest(`/bookings/${customerId}`);
}

// =========================
// FINANCE / INSURANCE
// =========================

export async function createFinanceEnquiry(enquiry) {
  return apiRequest("/finance-enquiries", {
    method: "POST",
    body: JSON.stringify(enquiry),
  });
}

export async function getFinanceEnquiries(customerId) {
  return apiRequest(
    `/finance-enquiries/${customerId}`
  );
}