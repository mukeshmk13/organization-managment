export interface Organization {
  orgId: string;
  organisationName: string;
  email: string;
  telephone: string;
  validFrom: Date;
  validTo: Date;
  lowConfidance: ConfidanceColor;
  midConfidance: ConfidanceColor;
  highConfidance: ConfidanceColor;
  highestConfidance: ConfidanceColor;
}

export interface ConfidanceColor {
  id: number;
  min: number;
  max: number;
  value: number;
  color: string;
}
