import ProfileHeader from "../components/profileHeader.jsx";
import { EditProfileForm } from "../components/editProfileForm.jsx";

const ProfilePage = () => {
  return (
    <div className="min-w-[320px] bg-gray-900 min-h-screen">
      <ProfileHeader />
      <div className="max-w-7xl mx-auto pb-28 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl text-center md:text-left md:ml-12 font-semibold mb-6 text-green-400">
            Edit your profile
          </h2>
        </div>
        <EditProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
