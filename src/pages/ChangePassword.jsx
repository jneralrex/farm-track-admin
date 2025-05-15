const ChangePassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-md w-full max-w-[400px] sm:max-w-[500px] h-auto mx-auto mt-10 p-6 sm:p-8">
        <form>
          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium py-2">
              Old Password
            </label>
            <input
              type="password"
              className="bg-[#f6f6f6] rounded-xl outline-none w-full pl-3 py-3 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              placeholder="Old Password"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium py-2">
              New Password
            </label>
            <input
              type="password"
              className="bg-[#f6f6f6] rounded-xl outline-none w-full pl-3 py-3 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              placeholder="New Password"
            />
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-sm sm:text-base font-medium py-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="bg-[#f6f6f6] rounded-xl outline-none w-full pl-3 py-3 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              placeholder="Confirm New Password"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button className="bg-[#16a349] text-white font-semibold rounded-full px-7 py-2 text-base sm:text-lg w-full sm:w-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
