export interface Announcement {
  id: string;
  title: string;
  date: string;
  body: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
}

export interface Policy {
  id: string;
  title: string;
  body: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
