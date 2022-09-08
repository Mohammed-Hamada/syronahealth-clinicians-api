interface UserHealthConditions {
  id: number;
  UserHealthConditions: [
    {
      id: number;
      healthConditions: string[];
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

export default UserHealthConditions;
