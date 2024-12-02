 type UserEntity = {
  id: string;
  full_name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  created_at: Date;
  updated_at: Date;
};

export default UserEntity
