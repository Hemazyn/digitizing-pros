import React from "react";
import { Trophy, FileText, Users, Star, CheckCircle, Package } from "lucide-react";

export default function LProcess() {
  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">How Our Loyalty Program Works</h3>
        <div className="flex flex-col gap-1">
          <h3 className="text-primary text-xs font-semibold">About the Program</h3>
          <p className="text-btext text-xs font-medium">Our loyalty program rewards you for every order you place with us. Earn points with each purchase, referral, and other activities, then redeem them for discounts, free services, and exclusive rewards.</p>
        </div>
        <div className="bg-btGray h-px w-full"></div> {/*  divider */}
        {/* Earning Points */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-primary text-xs font-semibold">Earning Points</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Standard Orders */}
            <div className="border-btGray flex items-center gap-1.5 rounded-md border bg-white p-4">
              <div className="bg-pointBg rounded-full p-2">
                <Package size={20} className="text-btBlue" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-primary text-xs font-semibold">Standard Orders</p>
                <span className="text-btext text-xxs font-medium">Earn 25 points for every standard digitizing order</span>
              </div>
            </div>
            {/* Rush Orders */}
            <div className="border-btGray flex items-center gap-1.5 rounded-md border bg-white p-4">
              <div className="bg-pointBg rounded-full p-2">
                <FileText size={20} className="text-btBlue" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-primary text-xs font-semibold">Rush Orders</p>
                <span className="text-btext text-xxs font-medium">Earn 35 points for rush orders (additional 10 points)</span>
              </div>
            </div>
            {/* Referrals */}
            <div className="border-btGray flex items-center gap-1.5 rounded-md border bg-white p-4">
              <div className="bg-pointBg rounded-full p-2">
                <Users size={20} className="text-btBlue" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-primary text-xs font-semibold">Referrals</p>
                <span className="text-btext text-xxs font-medium">Earn 50 points when a friend places their first order</span>
              </div>
            </div>
            {/* Reviews */}
            <div className="border-btGray flex items-center gap-1.5 rounded-md border bg-white p-4">
              <div className="bg-pointBg rounded-full p-2">
                <Star size={20} className="text-btBlue" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-primary text-xs font-semibold">Reviews</p>
                <span className="text-btext text-xxs font-medium">Earn 15 points when you leave a review for an order</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-btGray h-px w-full"></div> {/*  divider */}
        {/* Membership Tiers */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-primary text-xs font-semibold">Membership Tiers</h3>
          <div className="flex flex-col space-y-4">
            {/* Bronze Tier */}
            <div className="border-btGray flex items-center justify-between rounded-md border px-2.5 py-3">
              <div className="flex items-center gap-2">
                <div className="bg-bgBronze rounded-full p-2">
                  <Trophy size={16} className="text-white" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-primary text-sm font-semibold">Bronze</p>
                  <span className="text-btext text-xs">0-249 points</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-primary text-xs font-medium">Standard earning rate</span>
                <span className="text-btext text-xxs font-normal">Basic rewards access</span>
              </div>
            </div>
            {/* Silver Tier */}
            <div className="border-btGray flex items-center justify-between rounded-md border px-2.5 py-3">
              <div className="flex items-center gap-2">
                <div className="bg-bgSilver rounded-full p-2">
                  <Trophy size={16} className="text-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-primary text-sm font-semibold">Silver</p>
                  <span className="text-btext text-xs">250-749 points</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-primary text-xs font-medium">10% bonus points on orders</span>
                <span className="text-btext text-xxs">All rewards access</span>
              </div>
            </div>
            {/* Gold Tier */}
            <div className="border-btGray flex items-center justify-between rounded-md border px-2.5 py-3">
              <div className="flex items-center gap-2">
                <div className="bg-bgGold rounded-full p-2">
                  <Trophy size={16} className="text-white" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-primary text-sm font-semibold">Gold</p>
                  <span className="text-btext text-xs">750-1499 points</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-primary text-xs font-medium">20% bonus points on orders</span>
                <span className="text-btext text-xxs">Priority support + exclusive rewards</span>
              </div>
            </div>
            {/* Platinum Tier */}
            <div className="border-btGray flex items-center justify-between rounded-md border px-2.5 py-3">
              <div className="flex items-center gap-2">
                <div className="bg-tLine rounded-full p-2">
                  <Trophy size={16} className="text-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-primary text-sm font-semibold">Platinum</p>
                  <span className="text-btext text-xs">1500+ points</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-primary text-xs font-medium">30% bonus points on orders</span>
                <span className="text-btext text-xxs">VIP perks + exclusive rewards</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-btGray h-px w-full"></div> {/*  divider */}
        {/* Points Expiration & Terms */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-primary text-xs font-semibold">Points Expiration & Terms</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-btext" />
              <p className="text-primary text-xs font-medium">Points expire 12 months after they are earned if there is no account activity</p>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-btext" />
              <p className="text-primary text-xs font-medium">Rewards are subject to availability and may change without notice.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-btext" />
              <p className="text-primary text-xs font-medium">Digitizing Pros reserves the right to modify the loyalty program at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
