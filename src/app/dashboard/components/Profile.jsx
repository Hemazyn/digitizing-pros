import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const photoURL = user?.photoURL || "/photoURL.svg";
  const firstName = user?.displayName || "Buddy!";
  const emailAddress = user?.email || "Buddy!";

  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Profile Settings</h3>
        <form action="" className="form space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <input type="image" src={photoURL} alt="user photo" className="h-14 w-14" />
              <span className="text-btext text-xxs">Upload a new Avatar</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Display Name</label>
              <input placeholder={firstName} type="text" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
              <span className="text-btext text-xxs">This is the name that will be displayed to other users.</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Bio</label>
              <textarea name="bio" id="bio" cols="3" placeholder="Owner of Custom Embroidery Shop with over 10 years of experience in the industry." className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium"></textarea>
              <span className="text-btext text-xxs">This is the name that will be displayed to other users.</span>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-primary text-xs font-semibold">Business Information</h4>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Company Name</label>
              <input placeholder="Anelka Store" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="grid grid-cols-2 space-x-2">
              <div className="flex flex-col gap-2">
                <label className="text-primary block text-xs font-medium">Business Email</label>
                <input type="email" placeholder={emailAddress} className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-primary block text-xs font-medium">Business Phone</label>
                <input placeholder="+1 (676)782-7213" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Website</label>
              <input placeholder="https://anelkastore.com" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Business Address</label>
              <textarea name="bio" id="bio" cols="3" placeholder="123 Queens Road, Suite 101 Neville, CA 90210 United States" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium"></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
