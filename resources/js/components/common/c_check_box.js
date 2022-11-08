// // TODO::とりあえず配置
// const Checkbox = ({ children, ...props }) => (
//     <label style={{ marginRight: "1em" }}>
//         <input type="checkbox" {...props} />
//         {children}
//     </label>
// );

// export const selectBox = (props) => {
//     const {
//         isDisabled = false,
//         isLoading = false,
//         isClearable = false,
//         isRtl = false,
//         isSearchable = false,
//         isMulti = false,
//     } = props;

//     return (
//         <div className="w-72">
//             <Checkbox
//                 checked={isClearable}
//                 onChange={() => setIsClearable((state) => !state)}
//             >
//                 Clearable
//             </Checkbox>
//             <Checkbox
//                 checked={isSearchable}
//                 onChange={() => setIsSearchable((state) => !state)}
//             >
//                 Searchable
//             </Checkbox>
//             <Checkbox
//                 checked={isDisabled}
//                 onChange={() => setIsDisabled((state) => !state)}
//             >
//                 Disabled
//             </Checkbox>
//             <Checkbox
//                 checked={isLoading}
//                 onChange={() => setIsLoading((state) => !state)}
//             >
//                 Loading
//             </Checkbox>
//             <Checkbox
//                 checked={isRtl}
//                 onChange={() => setIsRtl((state) => !state)}
//             >
//                 RTL
//             </Checkbox>
//             <Checkbox
//                 checked={isMulti}
//                 onChange={() => setIsMulti((state) => !state)}
//             >
//                 Multi
//             </Checkbox>
//         </div>
//     );
// };
