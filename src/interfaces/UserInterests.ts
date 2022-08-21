interface UserInterests {
  id: number;
  UserInterests: [
    {
      id: number;
      interests: string[];
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

export default UserInterests;
