import Layout from "@/components/Layout";

const Campaign = () => {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Campaign</h2>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Campaign Management</h3>
            <p className="text-muted-foreground">
              This is the Campaign page. Here you can manage your marketing campaigns, 
              track performance, and create new campaigns.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h4 className="font-semibold">Active Campaigns</h4>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h4 className="font-semibold">Total Reach</h4>
              <p className="text-2xl font-bold">45.2K</p>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h4 className="font-semibold">Conversion Rate</h4>
              <p className="text-2xl font-bold">3.2%</p>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h4 className="font-semibold">Budget Used</h4>
              <p className="text-2xl font-bold">$2,340</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Campaign;