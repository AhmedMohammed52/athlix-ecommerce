import { supabase } from "../lib/supabase";

const addressSelect = `
  id,
  user_id,
  label,
  first_name,
  last_name,
  phone,
  address,
  city,
  postal_code,
  is_default,
  created_at,
  updated_at
`;

async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  if (!user) {
    throw new Error("You must be logged in.");
  }

  return user;
}

export async function getAddresses() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("user_addresses")
    .select(addressSelect)
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data || [];
}

export async function getDefaultAddress() {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("user_addresses")
    .select(addressSelect)
    .eq("user_id", user.id)
    .eq("is_default", true)
    .maybeSingle();

  if (error) throw error;

  return data || null;
}

export async function createAddress({
  label = "Home",
  firstName,
  lastName,
  phone,
  address,
  city,
  postalCode,
  isDefault = false,
}) {
  const user = await getCurrentUser();

  const { count, error: countError } = await supabase
    .from("user_addresses")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  if (countError) throw countError;

  const shouldBeDefault = count === 0 ? true : isDefault;

  const { data, error } = await supabase
    .from("user_addresses")
    .insert({
      user_id: user.id,
      label,
      first_name: firstName,
      last_name: lastName,
      phone,
      address,
      city,
      postal_code: postalCode,
      is_default: shouldBeDefault,
    })
    .select(addressSelect)
    .single();

  if (error) throw error;

  return data;
}

export async function updateAddress(
  addressId,
  { label, firstName, lastName, phone, address, city, postalCode, isDefault },
) {
  const user = await getCurrentUser();

  if (!addressId) {
    throw new Error("Address ID is required.");
  }

  const updateData = {
    label,
    first_name: firstName,
    last_name: lastName,
    phone,
    address,
    city,
    postal_code: postalCode,
    updated_at: new Date().toISOString(),
  };

  if (typeof isDefault === "boolean") {
    updateData.is_default = isDefault;
  }

  const { data, error } = await supabase
    .from("user_addresses")
    .update(updateData)
    .eq("id", addressId)
    .eq("user_id", user.id)
    .select(addressSelect)
    .single();

  if (error) throw error;

  return data;
}

export async function setDefaultAddress(addressId) {
  const user = await getCurrentUser();

  if (!addressId) {
    throw new Error("Address ID is required.");
  }

  const { data, error } = await supabase
    .from("user_addresses")
    .update({
      is_default: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", addressId)
    .eq("user_id", user.id)
    .select(addressSelect)
    .single();

  if (error) throw error;

  return data;
}

export async function deleteAddress(addressId) {
  const user = await getCurrentUser();

  if (!addressId) {
    throw new Error("Address ID is required.");
  }

  const { data: address, error: addressError } = await supabase
    .from("user_addresses")
    .select("id, is_default")
    .eq("id", addressId)
    .eq("user_id", user.id)
    .single();

  if (addressError) throw addressError;

  const { error: deleteError } = await supabase
    .from("user_addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", user.id);

  if (deleteError) throw deleteError;

  if (address.is_default) {
    const { data: nextAddress, error: nextAddressError } = await supabase
      .from("user_addresses")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextAddressError) throw nextAddressError;

    if (nextAddress) {
      const { error: defaultError } = await supabase
        .from("user_addresses")
        .update({
          is_default: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", nextAddress.id)
        .eq("user_id", user.id);

      if (defaultError) throw defaultError;
    }
  }

  return {
    success: true,
    id: addressId,
  };
}
