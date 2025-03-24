export default function DashboardLayout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header style={{ backgroundColor: 'black', padding: '1rem', color: 'white' }}>
                <h1>Dashboard</h1>
            </header>
            <main style={{ flex: 1, padding: '1rem' }}>
                {children}
            </main>
            <footer style={{ backgroundColor: '#f1f1f1', padding: '1rem', textAlign: 'center' }}>
                <p>&copy; 2023 Your Company</p>
            </footer>
        </div>
    );
}