 export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
}

export interface ConversationProp {
   
    name: string;
    message: string;
    date: string;
    unread: number;
}