export default function MyAccount() {
  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Account</h3>
        <form action="" className="form space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Email Address</label>
              <input type="email" placeholder="Sidiatbruma@gmail.com" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
              <span className="text-btext text-xxs">This is the email address you use to sign in and receive notifications.</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Username</label>
              <input placeholder="devEmma" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Full Name</label>
              <input placeholder="Emmanuel Tofunmi" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Phone Number</label>
              <input placeholder="+1 (676)782-7213" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium" />
            </div>
          </div>
          <div className="bg-btGray h-px w-full"></div> {/*  divider */}
          <div className="space-y-3">
            <h4 className="text-primary text-xs font-semibold">Account Preferences</h4>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-primary text-xs font-medium">Marketing Emails</p>
                <span className="text-xxs text-btext font-medium">Receive emails about new features, promotions, and special offers.</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" id="check" name="check" className="peer sr-only" />
                <div className="peer peer-checked:bg-btBlue h-4 w-8 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-primary text-xs font-medium">Newsletter</p>
                <span className="text-xxs text-btext font-medium">Receive our monthly newsletter with embroidery tips and industry news.</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" id="check" name="check" className="peer sr-only" />
                <div className="peer peer-checked:bg-btBlue h-4 w-8 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"></div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
