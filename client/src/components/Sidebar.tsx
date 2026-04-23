import React from 'react'

const Sidebar = ({
  NAV_ITEMS,
  active,
  setActive,
}: any) => {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .sidebar-btn {
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .sidebar-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000 !important;
        }
        .sidebar-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0 #000 !important;
        }
      `}</style>

      <div
        style={{
          position: 'sticky',
          top: '60px',                        /* match your navbar height */
          width: '220px',
          minWidth: '220px',
          height: 'fit-content',              /* don't stretch to parent height */
          maxHeight: 'calc(100vh - 80px)',    /* cap at viewport */
          overflowY: 'auto',
          alignSelf: 'flex-start',            /* critical: prevents flex stretch */
          background: '#f4f4f0',
          border: '2.5px solid #000',
          borderRadius: '4px',
          boxShadow: '5px 5px 0 #000',
          padding: '16px 12px',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: 14,
            paddingLeft: 4,
          }}
        >
          Menu
        </div>

        <div style={{ height: '2px', background: '#000', marginBottom: 14 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NAV_ITEMS.map((item : any) => {
            const isActive = active === item.label
            return (
              <button
                key={item.label}
                className="sidebar-btn"
                onClick={() => setActive(item.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '8px 12px',
                  background: isActive ? item.color : '#fff',
                  border: '2.5px solid #000',
                  borderRadius: '3px',
                  boxShadow: isActive ? '4px 4px 0 #000' : '3px 3px 0 #000',
                  fontWeight: 800,
                  fontSize: 13.5,
                  fontFamily: "'Syne', sans-serif",
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#000',
                  transform: isActive ? 'translate(-1px, -1px)' : 'none',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 26,
                    height: 26,
                    background: isActive ? 'rgba(0,0,0,0.12)' : item.color,
                    border: '2px solid #000',
                    borderRadius: '3px',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebar