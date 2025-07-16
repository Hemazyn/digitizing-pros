"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserSettingsSection, updateUserSettingsSection } from "@/lib/user/userSettings";
import Notiflix from "notiflix";

export default function MyAccount() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    email: "",
    username: "",
    fullName: "",
    phoneNumber: "",
    marketingEmails: true,
    newsletter: true,
  });

  // Load account data
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getUserSettingsSection(user.uid, "account");
        setForm({
          email: data.email || user.email || "",
          username: data.username || "",
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          marketingEmails: data.marketingEmails ?? true,
          newsletter: data.newsletter ?? true,
        });
      } catch (err) {
        console.error("Failed to load account settings:", err);
      }
      setLoading(false);
    })();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    Notiflix.Loading.circle("Saving...");
    try {
      await updateUserSettingsSection(user.uid, "account", form);
      Notiflix.Loading.remove();
      Notiflix.Notify.success("Account settings updated!");
    } catch (err) {
      console.error(err);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Failed to save settings.");
    }
  };

  // if (loading) return <div>Loading account data...</div>;

  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Account</h3>
        <form onSubmit={handleSubmit} className="form space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
              <span className="text-btext text-xxs">This is the email address you use to sign in and receive notifications.</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Username</label>
              <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Phone Number</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
          </div>

          <div className="bg-btGray h-px w-full"></div>

          <div className="space-y-3">
            <h4 className="text-primary text-xs font-semibold">Account Preferences</h4>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-primary text-xs font-medium">Marketing Emails</p>
                <span className="text-xxs text-btext font-medium">Receive emails about new features, promotions, and special offers.</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" name="marketingEmails" checked={form.marketingEmails} onChange={handleChange} className="peer sr-only" />
                <div className="peer peer-checked:bg-btBlue h-4 w-8 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-primary text-xs font-medium">Newsletter</p>
                <span className="text-xxs text-btext font-medium">Receive our monthly newsletter with embroidery tips and industry news.</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} className="peer sr-only" />
                <div className="peer peer-checked:bg-btBlue h-4 w-8 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-bg flex w-fit cursor-pointer flex-row rounded-lg p-1.5 text-xs font-medium text-white">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
