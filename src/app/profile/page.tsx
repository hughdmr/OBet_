import { UserForm } from "@/components/Form";
import { UserInfoIcons } from "@/components/UserInfoIcon";
import "./profile.css"

export default function Home() {
    return (
      <div className="profile-container">
        <UserInfoIcons />
        <div className="form-container">
          <UserForm />
        </div>
      </div>
    );
  }