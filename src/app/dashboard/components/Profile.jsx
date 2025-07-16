"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserSettingsSection, updateUserSettingsSection } from "@/lib/user/userSettings";
import Notiflix from "notiflix";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    companyName: "",
    businessEmail: "",
    businessPhone: "",
    website: "",
    businessAddress: "",
    photoURL: "",
  });

  useEffect(() => {
    if (!user) return;

    (async () => {
      setLoading(true);
      try {
        const data = await getUserSettingsSection(user.uid, "profile");
        setForm({
          displayName: data.displayName || user.displayName || "",
          bio: data.bio || "",
          companyName: data.companyName || "",
          businessEmail: data.businessEmail || user.email || "",
          businessPhone: data.businessPhone || "",
          website: data.website || "",
          businessAddress: data.businessAddress || "",
          photoURL: data.photoURL || user.photoURL || "",
        });
        setAvatarUrl(data.photoURL || user.photoURL || "");
      } catch (err) {
        console.error("Failed to load profile settings:", err);
      }
      setLoading(false);
    })();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    Notiflix.Loading.circle("Uploading image...");

    try {
      const imageRef = ref(storage, `avatars/${user.uid}/${Date.now()}-${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setAvatarUrl(downloadURL);
      setForm((prev) => ({ ...prev, photoURL: downloadURL }));
      Notiflix.Notify.success("Avatar uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      Notiflix.Notify.failure("Failed to upload avatar.");
    } finally {
      setUploading(false);
      Notiflix.Loading.remove();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    Notiflix.Loading.circle("Saving...");
    try {
      await updateUserSettingsSection(user.uid, "profile", {
        ...form,
        photoURL: avatarUrl,
      });
      Notiflix.Loading.remove();
      Notiflix.Notify.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Failed to update profile.");
    }
  };

  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Profile Settings</h3>
        <form onSubmit={handleSubmit} className="form space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <img src={form.photoURL || avatarUrl || "/photoURL.svg"} alt="User photo" className="border-btGray h-14 w-14 rounded-full border object-cover" />
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
              <span onClick={() => fileInputRef.current?.click()} className="text-btBlue text-xxs border-btBlue w-fit cursor-pointer rounded-md border p-1">
                {uploading ? "Uploading..." : "Upload a new Avatar"}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary text-xs font-medium">Display Name</label>
              <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="Display name" type="text" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
              <span className="text-btext text-xxs">This is the name that will be displayed to other users.</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary text-xs font-medium">Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Tell people about yourself" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
          </div>

          {/* BUSINESS INFO */}
          <div className="space-y-3">
            <h4 className="text-primary text-xs font-semibold">Business Information</h4>
            <div className="flex flex-col gap-2">
              <label className="text-primary text-xs font-medium">Company Name</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company name" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="grid grid-cols-2 space-x-2">
              <div className="flex flex-col gap-2">
                <label className="text-primary text-xs font-medium">Business Email</label>
                <input name="businessEmail" type="email" value={form.businessEmail} onChange={handleChange} placeholder="Business email" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-primary text-xs font-medium">Business Phone</label>
                <input name="businessPhone" value={form.businessPhone} onChange={handleChange} placeholder="Business phone" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary text-xs font-medium">Website</label>
              <input name="website" value={form.website} onChange={handleChange} placeholder="https://yourwebsite.com" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary text-xs font-medium">Business Address</label>
              <textarea name="businessAddress" value={form.businessAddress} onChange={handleChange} rows={3} placeholder="123 Queens Road, Suite 101, City, Country" className="border-sLine w-full rounded-lg border px-4 py-2 text-xs outline-0 placeholder:text-xs placeholder:font-medium" />
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
