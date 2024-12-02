type SessionEntity = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: "admin" | "user";
  created_at: Date;
  expires_at: Date;
};

export default SessionEntity;
