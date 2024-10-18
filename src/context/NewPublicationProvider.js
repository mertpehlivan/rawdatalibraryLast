import React, { createContext, useContext, useEffect, useState } from 'react';

const NewPublicationContext = createContext();
export const useNewPublicationContext = () => useContext(NewPublicationContext);

const NewPublicationProvider = ({ children }) => {
    const [textValidation, setTextValidation] = useState(false)
    const [folders, setFolders] = useState([

    ])
    const updateAuthorRole = (id, newRole) => {
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) =>
            author.id === id ? { ...author, authorRole: newRole } : author
          )
        );
      };
    const [authors, setAuthors] = useState([])
    const [publication, setPublication] = useState({
        type: "",
        data: {},
        pdf: {
            only: "PUBLIC",
            file: null
        },

    })

    const [editRawDataMode, setEditRawDataMode] = useState(false)
    const [editFolderMode, setEditFolderMode] = useState(false)


    const [step, setStep] = useState(0)

    const addAuthor = (newAuthor) => {
        console.log("newAuthor",newAuthor)
            setAuthors([...authors, newAuthor]);
    };

    // Remove an author by index
    const removeAuthor = (index) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };

    // Move an author up in the list
    const moveUpAuthor = (index) => {
        if (index <= 0) return;
        const newAuthors = [...authors];
        [newAuthors[index], newAuthors[index - 1]] = [newAuthors[index - 1], newAuthors[index]];
        setAuthors(newAuthors);
    };

    // Move an author down in the list
    const moveDownAuthor = (index) => {
        if (index >= authors.length - 1) return;
        const newAuthors = [...authors];
        [newAuthors[index], newAuthors[index + 1]] = [newAuthors[index + 1], newAuthors[index]];
        setAuthors(newAuthors);
    };

    const handleValidation = (isValid) => {
        setTextValidation(isValid);
    }
    const updateType = (newType) => {
        setPublication(prevState => ({
            ...prevState,
            type: newType
        }));
    };
    //Update data
    const updateData = (newData) => {
        // Update the publication data
        setPublication(prevState => {
            const updatedPublication = {
                ...prevState,
                data: newData
            };

            // Perform validation on the updated data
            handleValidation(() => {
                return Object.keys(updatedPublication.data).every(key => {
                    // Check if the key is not 'issue' or 'doi'
                    if (key !== "isbn" && key !== "doi" && key !== "completedDate" && key !=="linkOfTheConference" && key !== "references" && key !== "issue" && key !== "indexing") {
                        // Return false if any required field is empty
                        if (updatedPublication.data[key].trim() === '') return false;
                    }
                    // If the key is 'issue' or 'doi', or if no other key is empty, return true
                    return true;
                });
            });

            return updatedPublication;
        });

        // Optional: Log the updated data
        console.log(newData);
    };
    //Update PDF only
    const updatePdfOnly = (newPdfOnly) => {
        setPublication(prevState => ({
            ...prevState,
            pdf: {
                ...prevState.pdf,
                only: newPdfOnly
            }
        }));
    };
    //Update PDF file 
    const updatePdfFile = (newPdfFile) => {
        setPublication(prevState => ({
            ...prevState,
            pdf: {
                ...prevState.pdf,
                file: newPdfFile
            }
        }));
    };
    //Add file
    const addFolder = () => {
        setFolders(prevFolders => {
            return [
                ...prevFolders,
                {
                    name: "",
                    isEditing: true,
                    rawDatas: [

                    ]
                }
            ];
        });
    };

    const updateFolderName = (index, newName) => {
        setFolders(prevState => {
            // 'folders' dizisini 'prevState' objesinden çıkar
            const newFolders = [...prevState];

            // 'newFolders' dizisindeki belirtilen indeksteki öğeyi güncelle
            if (newFolders[index]) {
                newFolders[index] = { ...newFolders[index], name: newName };
            }

            // Güncellenmiş 'folders' dizisini geri döndür
            return newFolders;
        });
    };


    //Delete file
    const deleteFolder = (index) => {
        setFolders(prevState => {
            const newFolders = prevState.filter((_, i) => i !== index);
            return newFolders.map((folder, i) => ({ ...folder, order: i }));
        });
    };


    const moveFolderUp = (index) => {
        setFolders(prevState => {
            if (index === 0) return prevState; // already at the top

            const newFiles = [...prevState];
            [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];

            return newFiles.map((file, i) => ({ ...file, order: i }))

        });
    };

    const moveFolderDown = (index) => {
        setFolders(prevState => {
            if (index === prevState.length - 1) return prevState; // already at the bottom

            const newFiles = [...prevState];
            [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];

            return newFiles.map((file, i) => ({ ...file, order: i }))

        });
    };

    //Add raw data
    const addRawData = (folderIndex) => {
        // Create new raw data entry
        const newData = {
            name: "",
            comment: "",
            previewImage: null,
            rawdata: null,
            price_suggestion: null,
            isEditing: true,
            isFree:false
        };

        // Update state with the new raw data
        setFolders(prevState => {
            // Ensure the folderIndex is within bounds and the folder has rawDatas
            if (folderIndex < 0 || folderIndex >= prevState.length) {
                console.error("Invalid folder index:", folderIndex);
                return prevState;
            }

            const folder = prevState[folderIndex];
            if (!folder || !Array.isArray(folder.rawDatas)) {
                console.error("Folder or rawDatas is undefined or not an array");
                return prevState;
            }

            // Create a copy of the folders array
            const updatedFolders = [...prevState];

            // Add new data to the folder's rawDatas array
            const updatedRawDatas = [...folder.rawDatas, newData];

            // Update the specific folder with the new rawDatas
            updatedFolders[folderIndex] = {
                ...folder,
                rawDatas: updatedRawDatas
            };

            return updatedFolders;
        });
    };
    const toggleRawDataEditMode = (folderIndex, rawDataIndex) => {
        setFolders(prevState => {
            const updatedFolders = [...prevState];
            if (folderIndex < 0 || folderIndex >= updatedFolders.length) {
                console.error("Invalid folder index:", folderIndex);
                return prevState;
            }

            const folderToUpdate = { ...updatedFolders[folderIndex] };
            if (!folderToUpdate.rawDatas || rawDataIndex < 0 || rawDataIndex >= folderToUpdate.rawDatas.length) {
                console.error("Invalid rawData index or folder has no rawDatas");
                return prevState;
            }

            const updatedRawDatas = [...folderToUpdate.rawDatas];
            updatedRawDatas[rawDataIndex] = {
                ...updatedRawDatas[rawDataIndex],
                isEditing: !updatedRawDatas[rawDataIndex].isEditing
            };
            folderToUpdate.rawDatas = updatedRawDatas;
            updatedFolders[folderIndex] = folderToUpdate;

            return updatedFolders;
        });
    };

    const toggleFolderEditMode = (folderIndex) => {
        setFolders(prevState => {
            const updatedFolders = [...prevState];
            if (folderIndex < 0 || folderIndex >= updatedFolders.length) {
                console.error("Invalid folder index:", folderIndex);
                return prevState;
            }

            updatedFolders[folderIndex] = {
                ...updatedFolders[folderIndex],
                isEditing: !updatedFolders[folderIndex].isEditing
            };

            return updatedFolders;
        });
    };
    //Update raw data
    const updateRawData = (folderIndex, rawDataIndex, updatedRawData) => {
        setFolders(prevState => {
            // Make a copy of the folders array
            const updatedFolders = [...prevState];

            // Ensure the folderIndex is valid
            if (folderIndex < 0 || folderIndex >= updatedFolders.length) {
                console.error("Invalid folder index:", folderIndex);
                return prevState;
            }

            // Get the specific folder to update
            const folderToUpdate = { ...updatedFolders[folderIndex] };

            // Ensure the folder has rawDatas and that rawDataIndex is valid
            if (!folderToUpdate.rawDatas || rawDataIndex < 0 || rawDataIndex >= folderToUpdate.rawDatas.length) {
                console.error("Invalid rawData index or folder has no rawDatas");
                return prevState;
            }

            // Update the specific rawData
            const updatedRawDatas = [...folderToUpdate.rawDatas];
            updatedRawDatas[rawDataIndex] = { ...updatedRawData, order: rawDataIndex };

            // Update the folder with the new rawDatas
            folderToUpdate.rawDatas = updatedRawDatas;

            // Update the folders state with the modified folder
            updatedFolders[folderIndex] = folderToUpdate;

            return updatedFolders;
        });
    };

    const moveRawDataUp = (folderIndex, dataIndex) => {
        // Geçerli folder'ı kopyala
        const newFolders = [...folders];

        // İlgili folder'daki rawDatas array'ini kopyala
        const rawDatas = [...newFolders[folderIndex].rawDatas];

        // Sırasını değiştirmek için iki elemanı kopyala
        const upRawData = rawDatas[dataIndex];
        const downRawData = rawDatas[dataIndex - 1];

        // İndeks sınırlarını kontrol et
        if (dataIndex > 0) {
            // Elemanların yerlerini değiştir
            rawDatas[dataIndex] = downRawData;
            rawDatas[dataIndex - 1] = upRawData;


            // Değişiklikleri yeni folder'da güncelle
            newFolders[folderIndex] = {
                ...newFolders[folderIndex],
                rawDatas: rawDatas,
            };

            // State'i güncelle
            setFolders(newFolders);
        }
    };

    const moveRawDataDown = (folderIndex, dataIndex) => {
        setFolders(prevFolders => {
            const folder = prevFolders[folderIndex];
            if (dataIndex === folder.rawDatas.length - 1) return prevFolders; // already at the bottom

            // Swap raw data items
            const rawDatas = [...folder.rawDatas];
            const temp = rawDatas[dataIndex + 1];
            rawDatas[dataIndex + 1] = rawDatas[dataIndex];
            rawDatas[dataIndex] = temp;



            // Update folder with new rawDatas
            const updatedFolder = { ...folder, rawDatas };
            const updatedFolders = [...prevFolders];
            updatedFolders[folderIndex] = updatedFolder;

            return updatedFolders;
        });
    };

    //langue

    //Delete raw data 
    const removeRawData = (folderIndex, dataIndex) => {
        // Geçerli folder'ı kopyala
        const newFolders = [...folders];

        // Geçerli folder'ı kontrol et
        if (folderIndex < 0 || folderIndex >= newFolders.length) {
            console.error("Geçersiz folderIndex");
            return;
        }

        const folder = newFolders[folderIndex];
        // İlgili folder'daki rawDatas array'ini kontrol et
        if (!folder || !Array.isArray(folder.rawDatas)) {
            console.error("Geçersiz veya tanımsız rawDatas");
            return;
        }

        const rawDatas = [...folder.rawDatas];

        // İndeks sınırlarını kontrol et
        if (dataIndex < 0 || dataIndex >= rawDatas.length) {
            console.error("Geçersiz dataIndex");
            return;
        }

        // Raw data elemanını sil
        rawDatas.splice(dataIndex, 1);

        // Değişiklikleri yeni folder'da güncelle
        newFolders[folderIndex] = {
            ...folder,
            rawDatas: rawDatas.map((rawdata, i) => ({ ...rawdata, order: i })),
        };

        // State'i güncelle
        setFolders(newFolders);
    };

  
   

    //Update author
    const updateAuthor = (index, updatedAuthor) => {
        setPublication(prevState => {
            const newAuthors = [...prevState.authors];
            newAuthors[index] = { ...updatedAuthor, order: index };
            return {
                ...prevState,
                authors: newAuthors
            };
        });
    };

    //Delete author
    const deleteAuthor = (index) => {
        setPublication(prevState => {
            const newAuthors = prevState.authors.filter((_, i) => i !== index);
            return {
                ...prevState,
                authors: newAuthors.map((author, i) => ({ ...author, order: i }))
            };
        });
    };

    // Short order publication
    const sortPublication = () => {
        setPublication(prevState => ({
            ...prevState,
            files: [...prevState.files].sort((a, b) => a.order - b.order),
            authors: [...prevState.authors].sort((a, b) => a.order - b.order),
            // RawDatas'ları da sırala
            files: prevState.files.map(file => ({
                ...file,
                rawDatas: [...file.rawDatas].sort((a, b) => a.order - b.order)
            }))
        }));
    };
    return (
        <NewPublicationContext.Provider
            value={{
                updateType,
                updateData,
                updatePdfOnly,
                updatePdfFile,
                addFolder,
                deleteFolder,
                addRawData,
                updateRawData,
                authors,
                removeRawData,
                addAuthor,
                updateAuthor,
                deleteAuthor,
                sortPublication,
                setStep,
                step,
                publication,
                moveFolderUp,
                moveFolderDown,
                updateFolderName,
                moveRawDataUp,
                moveRawDataDown,
                folders,
                setFolders,
                editRawDataMode,
                setEditRawDataMode,
                editFolderMode,
                setEditFolderMode,
                toggleRawDataEditMode,
                toggleFolderEditMode,
                handleValidation,
                removeAuthor,
                moveUpAuthor,
                moveDownAuthor,
                textValidation,
                updateAuthorRole,
                setAuthors


            }}
        >
            {children}

        </NewPublicationContext.Provider>
    );
};

export default NewPublicationProvider;
