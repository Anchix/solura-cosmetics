import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  Home,
  LogOut,
  MapPin,
  Package,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Priya Krishnamurthy",
    phone: "9876543210",
    address: "45, Anna Nagar, 2nd Street",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600040",
  },
  {
    id: "addr-2",
    label: "Work",
    name: "Priya Krishnamurthy",
    phone: "9876543210",
    address: "12, IT Park, TIDEL Park",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600113",
  },
];

export default function AccountPage() {
  const { user, isLoggedIn, logout, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/auth" });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    });
  }, [user, reset]);

  if (!isLoggedIn) return null;

  const onSaveProfile = async (data: ProfileFormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setUser({ ...user!, ...data });
    setSaving(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed.");
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                My Account
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Welcome back, {user?.name?.split(" ")[0] ?? "there"}
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
              onClick={handleLogout}
              data-ocid="account-logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>

          {/* Avatar strip */}
          <div className="bg-card rounded-2xl border border-border p-5 mb-6 flex items-center gap-4 shadow-soft">
            <div className="h-16 w-16 rounded-full gradient-rose flex items-center justify-center shrink-0">
              <span className="font-display text-xl font-bold text-primary-foreground uppercase">
                {user?.name ? user.name[0] : "U"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-foreground truncate">
                {user?.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {user?.email}
              </p>
              {user?.phone && (
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              )}
            </div>
            <div className="ml-auto shrink-0">
              <Link to="/account/orders">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-ocid="account-view-orders"
                >
                  <Package className="h-4 w-4" />
                  Orders
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile">
            <TabsList
              className="bg-card border border-border rounded-xl p-1 mb-6 w-full sm:w-auto"
              data-ocid="account-tabs"
            >
              <TabsTrigger
                value="profile"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
            </TabsList>

            {/* ── Profile Tab ── */}
            <TabsContent value="profile" data-ocid="tab-profile">
              <div className="bg-card rounded-2xl border border-border shadow-soft p-6 max-w-xl">
                <div className="flex items-center gap-2 mb-6">
                  <Edit2 className="h-4 w-4 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Edit Profile
                  </h2>
                </div>
                <form
                  onSubmit={handleSubmit(onSaveProfile)}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...register("name", { required: true })}
                      data-ocid="profile-name-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email", { required: true })}
                      data-ocid="profile-email-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-1.5"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter valid 10-digit number",
                        },
                      })}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          ![
                            "Backspace",
                            "Delete",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      data-ocid="profile-phone-input"
                    />
                  </div>
                  <Separator />
                  <Button
                    type="submit"
                    disabled={!isDirty || saving}
                    className="gap-2"
                    data-ocid="profile-save-btn"
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* ── Orders Tab ── */}
            <TabsContent value="orders" data-ocid="tab-orders">
              <div className="bg-card rounded-2xl border border-border shadow-soft p-8 text-center max-w-xl">
                <Package className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                  View Your Orders
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Track, cancel, or reorder from your complete order history.
                </p>
                <Link to="/account/orders">
                  <Button className="gap-2" data-ocid="goto-orders-btn">
                    <Package className="h-4 w-4" />
                    Go to Order History
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* ── Addresses Tab ── */}
            <TabsContent value="addresses" data-ocid="tab-addresses">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Saved Addresses
                  </h2>
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setAddAddressOpen(true)}
                    data-ocid="add-address-btn"
                  >
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </div>

                {addresses.length === 0 ? (
                  <div
                    className="bg-card rounded-2xl border border-border p-12 text-center"
                    data-ocid="addresses-empty"
                  >
                    <Home className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      No saved addresses yet.
                    </p>
                    <Button
                      className="mt-4 gap-2"
                      size="sm"
                      onClick={() => setAddAddressOpen(true)}
                    >
                      <Plus className="h-4 w-4" /> Add Address
                    </Button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-card rounded-2xl border border-border p-5 shadow-soft hover:border-primary/30 transition-smooth"
                        data-ocid={`address-card-${addr.id}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full font-body">
                            <MapPin className="h-3 w-3" />
                            {addr.label}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveAddress(addr.id)}
                            aria-label="Remove address"
                            data-ocid={`remove-address-${addr.id}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <p className="font-body font-semibold text-foreground text-sm">
                          {addr.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {addr.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {addr.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Address Dialog */}
      <AddAddressDialog
        open={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
        onSave={(addr) => {
          setAddresses((prev) => [
            ...prev,
            { ...addr, id: `addr-${Date.now()}` },
          ]);
          setAddAddressOpen(false);
          toast.success("Address saved!");
        }}
      />
    </Layout>
  );
}

interface AddAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (addr: Omit<Address, "id">) => void;
}

function AddAddressDialog({ open, onClose, onSave }: AddAddressDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Address, "id">>();

  const onSubmit = (data: Omit<Address, "id">) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          reset();
        }
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Add New Address
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="Home / Work"
                defaultValue="Home"
                {...register("label", { required: true })}
                data-ocid="addr-label-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="addr-name">Full Name</Label>
              <Input
                id="addr-name"
                placeholder="Your name"
                {...register("name", { required: true })}
                data-ocid="addr-name-input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="addr-phone">Phone</Label>
            <Input
              id="addr-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              data-ocid="addr-phone-input"
            />
            {errors.phone && (
              <p className="text-xs text-destructive">
                Enter valid 10-digit number
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="addr-street">Street / Area</Label>
            <Input
              id="addr-street"
              placeholder="House no, street, area"
              {...register("address", { required: true })}
              data-ocid="addr-street-input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="addr-city">City</Label>
              <Input
                id="addr-city"
                placeholder="City"
                {...register("city", { required: true })}
                data-ocid="addr-city-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="addr-pincode">Pincode</Label>
              <Input
                id="addr-pincode"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit pincode"
                {...register("pincode", {
                  required: true,
                  pattern: /^[0-9]{6}$/,
                })}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                data-ocid="addr-pincode-input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="addr-state">State</Label>
            <Input
              id="addr-state"
              placeholder="State"
              {...register("state", { required: true })}
              data-ocid="addr-state-input"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" data-ocid="addr-save-btn">
              Save Address
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
