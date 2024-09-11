import { Schema, models, model } from "mongoose";

export interface IProject {
  title: string;
  estimatedAmount: number;
  selectedDate: Date;
  selectedProcedure: string;
  selectedSource: string;
  route: string
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    estimatedAmount: { type: Number, required: true },
    selectedDate: { type: Date, required: true },
    selectedProcedure: { type: String, required: true },
    selectedSource: { type: String, required: true },
    route: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// If the model already exists, use it; otherwise, create a new model
const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
