import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminRouter() {
    return (
        <>
            <body class="hold-transition sidebar-mini layout-fixed">
                <div class="wrapper">

                    <AdminHeader />

                    <AdminSidebar />


                    <div className="content-wrapper">
                        {/* Content Header */}
                        <div className="content-header">
                            <h1 className="">Dash Board</h1>
                        </div>
                        {/* Main content */}
                        <section className="content">
                            <h1>test</h1>
                        </section>
                    </div>
                </div>
            </body>
        </>
    );
}

export default AdminRouter;