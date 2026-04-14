import { useState, useMemo } from 'react';
import Tree from 'react-d3-tree';
import BST from './bst';
import './App.css';

const INITIAL_NUMBERS = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];

function App() {
  const [tree] = useState(() => {
    const bst = new BST();
    INITIAL_NUMBERS.forEach((n) => bst.insert(n));
    return bst;
  });

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [, forceUpdate] = useState(0);

  const traversals = useMemo(() => ({
    inorder: tree.inorder(),
    preorder: tree.preorder(),
    postorder: tree.postorder(),
  }), [tree, forceUpdate]);

  // Imprimir recorridos en consola
  useMemo(() => {
    console.log('Inorder:', traversals.inorder.join(', '));
    console.log('Preorder:', traversals.preorder.join(', '));
    console.log('Postorder:', traversals.postorder.join(', '));
  }, [traversals]);

  const d3Data = useMemo(() => tree.toD3Tree(), [tree, forceUpdate]);

  const handleSearch = () => {
    const val = Number(searchValue);
    if (isNaN(val)) return;
    const found = tree.search(val);
    setSearchResult({ value: val, found });
    console.log(`Search ${val}: ${found ? 'FOUND' : 'NOT FOUND'}`);
  };

  const handleInsert = () => {
    const val = Number(inputValue);
    if (isNaN(val) || inputValue === '') return;
    tree.insert(val);
    setInputValue('');
    forceUpdate((n) => n + 1);
    console.log(`Inserted ${val}`);
    console.log('Inorder:', tree.inorder().join(', '));
    console.log('Preorder:', tree.preorder().join(', '));
    console.log('Postorder:', tree.postorder().join(', '));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Challenge 08 - Binary Search Tree</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div>
          <h3>Insert a value</h3>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Number"
            style={{ padding: '8px', marginRight: '8px' }}
          />
          <button onClick={handleInsert} style={{ padding: '8px 16px' }}>Insert</button>
        </div>

        <div>
          <h3>Search a value</h3>
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Number"
            style={{ padding: '8px', marginRight: '8px' }}
          />
          <button onClick={handleSearch} style={{ padding: '8px 16px' }}>Search</button>
          {searchResult && (
            <p style={{ color: searchResult.found ? 'green' : 'red', fontWeight: 'bold' }}>
              {searchResult.value} {searchResult.found ? 'was found in the tree' : 'was NOT found in the tree'}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div>
          <h3>Inorder</h3>
          <p>{traversals.inorder.join(', ')}</p>
        </div>
        <div>
          <h3>Preorder</h3>
          <p>{traversals.preorder.join(', ')}</p>
        </div>
        <div>
          <h3>Postorder</h3>
          <p>{traversals.postorder.join(', ')}</p>
        </div>
      </div>

      <h3>Tree Visualization (react-d3-tree)</h3>
      <div
        style={{
          width: '100%',
          height: '500px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        {d3Data && (
          <Tree
            data={d3Data}
            orientation="vertical"
            translate={{ x: 400, y: 50 }}
            pathFunc="straight"
            nodeSize={{ x: 80, y: 80 }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
