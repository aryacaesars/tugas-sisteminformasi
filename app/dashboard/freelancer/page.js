export default function FreelancerDashboard() {
    return (
        <div>
            <h1>Freelancer Dashboard</h1>
            <p>Welcome to your dashboard. Manage your projects and tasks here.</p>
        <a href="/">
        <button className="group relative w-full flex justify-center py-3 px-4 border border-gray-800 text-sm font-medium rounded-md text-white hover:bg-gray-900 transition-colors">
                    Logout
                    <span className="absolute right-3 inset-y-0 flex items-center">
                    </span>
                </button>
        </a> 


        </div>
    );
}