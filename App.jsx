import { useState } from "react";

const sections = ["Dashboard","PTL & POC","Picker","Unreachable","History","How To Use"];

const branches = [
  "Spinneys - Mall of Arabia",
  "Carrefour - Mall of Egypt",
  "Oscar - Heliopolis",
  "Panda - Maadi"
];

export default function App() {
  const [active, setActive] = useState("Dashboard");

  const [ptlForm, setPtlForm] = useState({
    name:"",
    phone:"",
    branch:[],
    status:"Active"
  });

  const [ptlData, setPtlData] = useState([]);
  const [history, setHistory] = useState([]);

  const save = () => {
    setPtlData([...ptlData, ptlForm]);
    setHistory([{type:"PTL Save",data:ptlForm,date:new Date().toLocaleString()},...history]);
    setPtlForm({name:"",phone:"",branch:[],status:"Active"});
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-2 gap-4">
      {["PTL & POC","Picker","Unreachable","History"].map(i=>(
        <div key={i} onClick={()=>setActive(i)} className="p-6 rounded-2xl shadow border border-pink-200 text-center text-pink-600 font-bold cursor-pointer">
          {i}
        </div>
      ))}
    </div>
  );

  const renderPTL = () => (
    <div className="space-y-3">
      <input className="border p-2 w-full rounded" placeholder="Name" value={ptlForm.name} onChange={e=>setPtlForm({...ptlForm,name:e.target.value})}/>
      <input className="border p-2 w-full rounded" placeholder="Phone" value={ptlForm.phone} onChange={e=>setPtlForm({...ptlForm,phone:e.target.value})}/>

      <select multiple className="border p-2 w-full rounded"
        value={ptlForm.branch}
        onChange={e=>setPtlForm({...ptlForm,branch:[...e.target.selectedOptions].map(o=>o.value)})}>
        {branches.map(b=><option key={b}>{b}</option>)}
      </select>

      <select className="border p-2 w-full rounded"
        value={ptlForm.status}
        onChange={e=>setPtlForm({...ptlForm,status:e.target.value})}>
        <option>Active</option>
        <option>Inactive</option>
        <option>Unreachable</option>
      </select>

      <button onClick={save} className="bg-pink-600 text-white px-4 py-2 rounded-xl">Save</button>

      <div>
        {ptlData.map((r,i)=>(
          <div key={i} className="p-2 border rounded mt-2">{r.name} - {r.phone}</div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div>
      {history.map((h,i)=>(
        <div key={i} className="p-2 border rounded mb-2">
          {h.type} - {h.date}
        </div>
      ))}
    </div>
  );

  const render = () => {
    if(active==="Dashboard") return renderDashboard();
    if(active==="PTL & POC") return renderPTL();
    if(active==="History") return renderHistory();
    return <div className="text-pink-600">Coming Soon</div>;
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r p-4">
        <h1 className="text-pink-600 font-bold mb-4">Instashop</h1>
        {sections.map(s=>(
          <div key={s} onClick={()=>setActive(s)} className="p-2 cursor-pointer hover:text-pink-600">
            {s}
          </div>
        ))}
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold text-pink-600 mb-4">{active}</h2>
        {render()}
      </div>
    </div>
  );
}
