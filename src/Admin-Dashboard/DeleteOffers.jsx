
import { useEffect, useState } from 'react';
import { deleteEntity, getEntitysList } from '../service/OfferService.js';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

const DeleteOffers = () => {

    const [ allRecordsArr,setAllrecordsarr ] = useState([]);
    const [ loading,setLoading ] = useState(true);

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(()=>{
        const getRecordsList = async() =>{
            try
            {
                const data = await getEntitysList();
                const dataRecords = data.map((item,index) => ({
                    id: index+1,
                    offerid: item._id,
                    title: item.title,
                    detail: item.detail,
                }));
                setAllrecordsarr(dataRecords);
            }
            catch( error )
            {      
                toast.error( "Unable to Load Offers: " + error.message )
            }
            finally
            {
                setLoading(false);
            }          
        }

        getRecordsList();
    },[]);

    const editCall = (offerid)=>
    {
        navigate( `/admindashboard/edit-offer/${offerid}` );
    }
    const deleteCall = async (offerid) => {
        const confirmbox = confirm("Are you sure you want to delete ?");

        if (confirmbox) {
            try {
                const data = await deleteEntity(offerid);
                if (data?.deletedSuccess) {
                    toast.success("Offer deleted successfully!");
                    
                    // 1. Calculate the new local array state first
                    const updatedList = allRecordsArr.filter(item => item.offerid !== offerid);
                    
                    // 2. Recalculate what the total pages *will* be with the new data length
                    // We use your filteredRecords logic to ensure it works accurately even during active search filters
                    const activeFilteredList = updatedList.filter(item =>
                        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.detail.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    
                    const newTotalPages = Math.ceil(activeFilteredList.length / itemsPerPage);

                    // 3. FIX: Adjust page boundaries downward if the deletion empties out the last page block
                    // Ensure we never drop below page 1
                    if (currentPage > newTotalPages && newTotalPages > 0) {
                        setCurrentPage(newTotalPages);
                    } else if (activeFilteredList.length === 0) {
                        setCurrentPage(1); // Reset back to clean slate baseline if database is completely wiped
                    }

                    // 4. Safely update your React component state tracking
                    setAllrecordsarr(updatedList);
                } else {
                    toast.info("Could not delete service.");
                }
            } catch (error) {
                toast.error("Could not delete service : " + error.message);
            }
        }
    }
    // --- NEW: Sorting Engine Logic ---
    const handleSort = (field) => {
        if (sortField === field) {
            // Toggle direction if clicking the same header
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // New field clicked, default to ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredRecords = allRecordsArr.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.detail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedRecords = [...filteredRecords].sort((a, b) => {
        if (!sortField) return 0;
        
        const valueA = a[sortField].toLowerCase();
        const valueB = b[sortField].toLowerCase();

        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecordsOnPage = sortedRecords.slice(indexOfFirstItem, indexOfLastItem);

    const SortArrow = ({ field }) => {
        if (sortField !== field) return <span className="ml-1 text-gray-400">↕</span>;
        return sortDirection === 'asc' ? <span className="ml-1 text-emerald-600">↑</span> : <span className="ml-1 text-emerald-600">↓</span>;
    };

    if( loading ) return <p className='mt-5 text-center'>Loading Offers List...</p>

    return (
        <div className='mt-10 ps-13'>
            <ToastContainer position='top-right' autoClose={3000} />        

            <div className="w-[80%]">
            
                <div className="mb-4 max-w-sm">
                    <input
                    type="text"
                    placeholder="Search offers..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
                    <table className="min-w-full divide-y divide-gray-200 border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-700">

                        <tr className="divide-x divide-gray-200">
                            <th onClick={() => handleSort('title')} className="cursor-pointer px-6 py-3 select-none hover:bg-gray-100">
                                Offer Title <SortArrow field="title" />
                            </th>
                            <th onClick={() => handleSort('detail')} className="cursor-pointer px-6 py-3 select-none hover:bg-gray-100">
                                Offer Detail <SortArrow field="detail" />
                            </th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* --- ADDED: Row/Col borders via internal table lines (divide-x divide-y) --- */}
                    <tbody className="divide-y divide-gray-400 divide-x divide-gray-200">
                        {currentRecordsOnPage.map((record) => (
                        <tr 
                            key={record.id} 
                            className="even:bg-gray-100 hover:bg-emerald-50/30 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900">{record.title}</td>
                            <td className="px-6 py-4">{record.detail}</td>
                            <td className="py-4 flex flex-row justify-center">
                                <PencilSquareIcon onClick={()=>editCall(record.offerid)} className='cursor-pointer size-6 text-blue-500' />
                                <TrashIcon onClick={()=>deleteCall(record.offerid)} className='cursor-pointer size-6 text-red-500' />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-700">
                    {sortedRecords.length === 0 ? (
                        "No results found"
                    ) : (
                        <>
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(indexOfLastItem, sortedRecords.length)}</span> of{' '}
                        <span className="font-medium">{sortedRecords.length}</span> results
                        </>
                    )}
                    </p>
                    <div className="flex gap-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                    </div>
                </div>
            </div>

        </div>

    );

}

export default DeleteOffers;
