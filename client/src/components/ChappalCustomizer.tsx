import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useUserOrderDetail } from '../pages/Contexts/UserOrderDetail';

interface Option {
  name: string;
  label: string;
  hex?: string;
  price?: number;
}


interface ChappalCustomizerProps {
  product: any;
   styleOptions: Option[];
  materialOptions: Option[];
  soleOptions: Option[];
  size: string;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  selectedStyle: string;
  setSelectedStyle: (value: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (value: string) => void;
  selectedSole: string;
  setSelectedSole: (value: string) => void;
}

 

const ChappalCustomizer: React.FC<ChappalCustomizerProps> = ({
  product,
  styleOptions,
  materialOptions,
  soleOptions,
  size,
  selectedColor,
  setSelectedColor,
  selectedStyle,
  setSelectedStyle,
  selectedMaterial,
  setSelectedMaterial,
  selectedSole,
  setSelectedSole
}) => {
  const [orderProduct, setOrderProduct] = useState({
    color: '',
    style: '',
    material: '',
    sole: '',
    size: ''
  });
  const { addOrUpdateOrder }=useUserOrderDetail()
  useEffect(() => {
    setOrderProduct({
      ...product,
      color: selectedColor,
      style: selectedStyle,
      material: selectedMaterial,
      sole: selectedSole,
      size: size
    });
    addOrUpdateOrder(orderProduct)
  }, [selectedColor, selectedStyle, selectedMaterial, selectedSole, size, product]);
  

 
  return (
    <div
      style={{
        background: '#f9f9f9',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #e0e0e0'
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Settings size={18} />
        Customize Your Chappal
      </h3>

      {/* Color Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>Color:</h4>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            background: 'white'
          }}
        >
          <option value="">Select Color</option>
          { product.color.map((color,i) => (
            <option key={i} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Style Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>Style:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
          {styleOptions.map((style) => (
            <div
              key={style.name}
              onClick={() => setSelectedStyle(style.name)}
              style={{
                padding: '12px',
                border: selectedStyle === style.name ? '2px solid #FF6B6B' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedStyle === style.name ? '#fff5f5' : 'white',
                textAlign: 'center',
                fontSize: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{style.label}</div>
              {style.price && style.price > 0 && (
                <div style={{ color: '#FF6B6B', fontWeight: 'bold' }}>+PKR{style.price}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Material */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>Material:</h4>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            background: 'white'
          }}
        >
          {materialOptions.map((material) => (
            <option key={material.name} value={material.name}>
              {material.label} {material.price !== 0 && `(${material.price > 0 ? '+' : ''}PKR${material.price})`}
            </option>
          ))}
        </select>
      </div>

      {/* Sole */}
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#555' }}>Sole Type:</h4>
        <select
          value={selectedSole}
          onChange={(e) => setSelectedSole(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            background: 'white'
          }}
        >
          {soleOptions.map((sole) => (
            <option key={sole.name} value={sole.name}>
              {sole.label} {sole.price && sole.price > 0 && `(+PKR${sole.price})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChappalCustomizer;
