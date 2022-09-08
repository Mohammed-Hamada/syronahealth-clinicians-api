interface UserEngagements {
  id: number;
  UserEngagements: [
    {
      id: number;
      engagements: string[];
      user: number;
    }
  ];
  Employee: {
    id: number;
    timestamp: Date;
    updated: Date;
    user: number;
    corporate: number;
  };
}

export default UserEngagements;
