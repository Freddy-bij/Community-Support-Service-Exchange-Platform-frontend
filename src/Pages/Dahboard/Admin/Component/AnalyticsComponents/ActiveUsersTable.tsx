import { FiUsers } from "react-icons/fi";
import type { ActiveUser } from "../../Serivices/Types/types";

interface ActiveUsersTableProps {
  users: ActiveUser[];
}

const ActiveUsersTable = ({ users }: ActiveUsersTableProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm ">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiUsers className="text-[#2C7A7B]" />
        Most Active Users
      </h2>
      <div className="space-y-3">
        {users.map((user, index) => (
          <div key={user.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 ">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white ${
                index === 0 ? 'bg-[#2C7A7B]' :
                index === 1 ? 'bg-gray-400' :
                index === 2 ? 'bg-gray-500' :
                'bg-gray-300'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#2C7A7B]">{user.totalActivity}</p>
              <p className="text-xs text-gray-500 font-medium">{user.requestCount} Req / {user.responseCount} Res</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveUsersTable;
