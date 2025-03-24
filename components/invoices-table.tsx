export default function InvoicesTable() {
    const invoices = [
      {
        id: "I-264649",
        customerName: "Hakeem Mohammed",
        user: "Patience Osei",
        phone: "0599049002",
        total: 523.7,
        status: "Paid",
        dateCreated: "22/1/2024 9:26 AM",
        dateModified: "21/1/2024 12:01 AM",
      },
      {
        id: "I-264650",
        customerName: "Hakeem Mohammed",
        user: "Patience Osei",
        phone: "0599049002",
        total: 523.7,
        status: "Paid",
        dateCreated: "22/1/2024 9:26 AM",
        dateModified: "21/1/2024 12:01 AM",
      },
      {
        id: "I-264651",
        customerName: "Hakeem Mohammed",
        user: "Patience Osei",
        phone: "0599049002",
        total: 523.7,
        status: "Paid",
        dateCreated: "22/1/2024 9:26 AM",
        dateModified: "21/1/2024 12:01 AM",
      },
    ]
  
    return (
      <div className="w-full h-full bg-white rounded-md shadow overflow-hidden">
        <div className="h-10 w-full bg-[#cdcaca] flex items-center border-b-2 border-[#161524]">
          <div className="text-[#161524] text-sm font-bold font-['Roboto_Slab'] ml-4 uppercase tracking-wider">
            Invoices
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="h-9 text-xs text-[#161524] font-bold font-['Roboto_Slab'] bg-white border-b-2 border-[#cdcaca]">
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  ID
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  Customer Name
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  User
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  Phone
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  Total
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  Status
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider relative">
                  Date Created
                  <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
                </th>
                <th className="px-4 py-2 text-left uppercase tracking-wider">Date Modified</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`text-sm hover:bg-[#bbb7b7] cursor-pointer ${
                    index % 2 === 0 ? "bg-[#cfc9c9]" : "bg-[#e0dddd]"
                  }`}
                >
                  <td className="px-4 py-3 border-b border-[#e0dddd] font-bold text-[#161524]">{invoice.id}</td>
                  <td className="px-4 py-3 border-b border-[#e0dddd]">{invoice.customerName}</td>
                  <td className="px-4 py-3 border-b border-[#e0dddd]">{invoice.user}</td>
                  <td className="px-4 py-3 border-b border-[#e0dddd]">{invoice.phone}</td>
                  <td className="px-4 py-3 border-b border-[#e0dddd] font-bold text-right">{invoice.total}</td>
                  <td className="px-4 py-3 border-b border-[#e0dddd] font-bold relative pl-6">
                    <span className="before:content-[''] before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-[#161524] before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-[#e0dddd] italic text-gray-600">{invoice.dateCreated}</td>
                  <td className="px-4 py-3 border-b border-[#e0dddd] italic text-gray-600">{invoice.dateModified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  