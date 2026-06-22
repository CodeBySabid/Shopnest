"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye, EyeOff, Upload } from "lucide-react";
import uploadImageToCloudinary from "@/lib/uploadImage";
import axiosPublic from "@/lib/axios";
import Image from "next/image";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  image: FileList;
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const password = watch("password")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const imageRegister = register("image");

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      let imageUrl = "";
      if (data.image && data.image[0]) {
        imageUrl = await uploadImageToCloudinary(data.image[0]);
      }

      const res = await axiosPublic.post("/api/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        image: imageUrl,
      })

      if (res.data.success) {
        router.push("/login?registered=true");
      }
    }
    catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosErr.response?.data?.message || "Registration failed"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  // Password validation rules
  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    validate: {
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) || "Must contain at least 1 capital letter",
      hasLowerCase: (value: string) =>
        /[a-z]/.test(value) || "Must contain at least 1 small letter",
      hasNumber: (value: string) =>
        /[0-9]/.test(value) || "Must contain at least 1 number",
      hasSpecialChar: (value: string) =>
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
        "Must contain at least 1 special character",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
      <div className="card bg-base-100 shadow-xl w-full max-w-lg">
        <div className="card-body p-8">

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full inline-block mb-3">
              <ShoppingBag size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-base-content/60 text-sm mt-1">
              Join ShopNest today
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Upload size={24} className="text-base-content/40" />
                  )}
                </div>
              </div>
              <label className="btn btn-outline btn-sm gap-2 cursor-pointer">
                <Upload size={14} />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...imageRegister}
                  onChange={(e) => {
                    imageRegister.onChange(e);
                    handleImageChange(e);
                  }}
                />
              </label>
            </div>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""
                  }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="+880 1234 567890"
                className={`input input-bordered w-full ${errors.phone ? "input-error" : ""
                  }`}
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
              {errors.phone && (
                <span className="text-error text-xs mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Address</span>
              </label>
              <textarea
                placeholder="Your full address"
                className={`textarea textarea-bordered w-full ${errors.address ? "textarea-error" : ""
                  }`}
                rows={2}
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <span className="text-error text-xs mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  className={`input input-bordered w-full pr-10 ${errors.password ? "input-error" : ""
                    }`}
                  {...register("password", passwordValidation)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className={`input input-bordered w-full pr-10 ${errors.confirmPassword ? "input-error" : ""
                    }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-error text-xs mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}