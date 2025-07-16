"use client";
import { useAuth } from "@/context/AuthContext";
import { getUserSettingsSection, updateUserSettingsSection } from "@/lib/user/userSettings";
import { useState, useEffect } from "react";
import Notiflix from "notiflix";

export default function Notification() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    email: {
      orderUpdates: true,
      messages: true,
      promotions: false,
      accountActivity: true,
    },
    inApp: {
      orderUpdates: true,
      messages: true,
      promotions: false,
      accountActivity: true,
    },
    push: {
      orderUpdates: false,
    },
  });

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getUserSettingsSection(user.uid, "notifications");
        setForm({
          email: {
            orderUpdates: data.email?.orderUpdates ?? true,
            messages: data.email?.messages ?? true,
            promotions: data.email?.promotions ?? false,
            accountActivity: data.email?.accountActivity ?? true,
          },
          inApp: {
            orderUpdates: data.inApp?.orderUpdates ?? true,
            messages: data.inApp?.messages ?? true,
            promotions: data.inApp?.promotions ?? false,
            accountActivity: data.inApp?.accountActivity ?? true,
          },
          push: {
            orderUpdates: data.push?.orderUpdates ?? false,
          },
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [user]);

  const handleCheckboxChange = (section, field) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    Notiflix.Loading.circle("Saving...");
    try {
      await updateUserSettingsSection(user.uid, "notifications", form);
      Notiflix.Loading.remove();
      Notiflix.Notify.success("Notifications updated!");
    } catch (err) {
      console.error(err);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Failed to save notifications.");
    }
  };

  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Notification Settings</h3>
        <div className="flex flex-col space-y-3">
          <p className="text-primary text-xs font-semibold">Email Notifications</p>
          <div className="space-y-2">
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.email.orderUpdates} onChange={() => handleCheckboxChange("email", "orderUpdates")} className="accent-btBlue border-btGray rounded-md border" />
              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Order Updates</p>
                <span className="text-xxs text-btext font-medium">Receive email notifications when your order status changes.</span>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.email.messages} onChange={() => handleCheckboxChange("email", "messages")} className="accent-btBlue border-btGray rounded-md border" />
              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Messages</p>
                <span className="text-xxs text-btext font-medium">Receive email notifications for new messages from our team.</span>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.email.promotions} onChange={() => handleCheckboxChange("email", "promotions")} className="accent-btBlue border-btGray rounded-md border" />
              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Promotions and Offers</p>
                <span className="text-xxs text-btext font-medium">Receive email notifications about special offers, discounts, and promotions.</span>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.email.accountActivity} onChange={() => handleCheckboxChange("email", "accountActivity")} className="accent-btBlue border-btGray rounded-md border" />
              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Account Activity</p>
                <span className="text-xxs text-btext font-medium">Receive email notifications about important account activities like password changes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-btGray h-px w-full"></div> {/*  divider */}
        <div className="flex flex-col space-y-3">
          <p className="text-primary text-xs font-semibold">In-App Notifications</p>
          <div className="space-y-2">
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.inApp.orderUpdates} onChange={() => handleCheckboxChange("inApp", "orderUpdates")} className="accent-btBlue border-btGray rounded-md border" />

              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Order Updates</p>
                <span className="text-xxs text-btext font-medium">Receive in-app notifications when your order status changes.</span>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.inApp.orderUpdates} onChange={() => handleCheckboxChange("inApp", "orderUpdates")} className="accent-btBlue border-btGray rounded-md border" />

              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Messages</p>
                <span className="text-xxs text-btext font-medium">Receive in-app notifications for new messages from our team</span>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.inApp.orderUpdates} onChange={() => handleCheckboxChange("inApp", "orderUpdates")} className="accent-btBlue border-btGray rounded-md border" />

              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Promotions and Offers</p>
                <span className="text-xxs text-btext font-medium">Receive in-app notifications about special offers, discounts, and promotions.</span>
              </div>
            </div>
            <div className="flex flex-row items-start space-x-2">
              <input type="checkbox" checked={form.inApp.orderUpdates} onChange={() => handleCheckboxChange("inApp", "orderUpdates")} className="accent-btBlue border-btGray rounded-md border" />

              <div className="flex flex-col space-y-1">
                <p className="text-primary text-xs font-medium">Account Activity</p>
                <span className="text-xxs text-btext font-medium">Receive in-app notifications about important account activities.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-btGray h-px w-full"></div> {/*  divider */}
        <div className="flex flex-col space-y-3">
          <p className="text-primary text-xs font-semibold">Push Notifications</p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-primary text-xs font-medium">Order Updates</p>
              <span className="text-xxs text-btext font-medium">Receive in-app notifications when your order status changes.</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" checked={form.push.orderUpdates} onChange={() => handleCheckboxChange("push", "orderUpdates")} className="peer sr-only" />
              <div className="peer peer-checked:bg-btBlue h-4 w-8 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
            </label>
          </div>
        </div>
        <button type="button" onClick={handleSubmit} className="btn-bg flex w-fit cursor-pointer flex-row rounded-lg p-1.5 text-xs font-medium text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
