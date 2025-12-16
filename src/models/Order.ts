import mongoose from "mongoose";

export interface OrderDoc extends mongoose.Document {
  orderID: string;
  items: [any];
  totalAmount: number;
  paidThrough: string;
  paymentResponse: string;
  orderStatus: string;
}

const OrderSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          required: true,
        },
        unit: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: {
      type: Date,
    },
    paidThrough: {
      type: String,
    },
    paymentResponse: {
      type: String,
    },
    orderStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<OrderDoc>("order", OrderSchema);
