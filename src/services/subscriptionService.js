import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveSubscriptionLead({
  name,
  email,
  phone,
  sourcePage,
  trigger,
}) {
  const leadData = {
    name,
    email,
    phone,

    sourcePage: sourcePage || "unknown",
    trigger: trigger || "unknown",

    // User has started the subscription process,
    // but has not yet been verified as subscribed.
    status: "pending",

    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "subscriptionLeads"), leadData);

  return docRef.id;
}
