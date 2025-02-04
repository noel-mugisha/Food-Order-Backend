import mongoose, { Schema, Document } from 'mongoose';

export interface FoodDoc extends Document {
  vendorId: string;
  name: string;
  description: string;
  category?: string;
  foodType: string;
  readyTime?: number;
  price: number;
  rating?: number;
  images?: string[];
}

const FoodSchema: Schema<FoodDoc> = new Schema<FoodDoc>(
  {
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number, required: true },
    rating: { type: Number },
    images: { type: [String] }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: FoodDoc, ret: any): void {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      }
    }
  }
);

const FoodModel = mongoose.model<FoodDoc>('Foods', FoodSchema);

export { FoodModel };
