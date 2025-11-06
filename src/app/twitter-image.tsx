import { ImageResponse } from "next/og";

// Configuración de la imagen
export const runtime = "edge";
export const alt = "Mi Piso España - Reubicación en Madrid y Barcelona";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f7f5ef",
          backgroundImage: "linear-gradient(45deg, #aab257 0%, #637569 100%)",
          padding: "60px",
        }}
      >
        {/* Contenido principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            paddingRight: "40px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(247, 245, 239, 0.95)",
              borderRadius: "16px",
              padding: "40px",
              width: "100%",
            }}
          >
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#637569",
                margin: "0 0 20px 0",
                fontFamily: "system-ui",
              }}
            >
              Mi Piso España
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "#8b924a",
                margin: "0 0 24px 0",
                fontFamily: "system-ui",
                lineHeight: 1.4,
              }}
            >
              Agencia especializada en reubicación
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#aab257",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Madrid
              </span>
              <span
                style={{
                  backgroundColor: "#8b924a",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Barcelona
              </span>
            </div>
          </div>
        </div>

        {/* Logo lado derecho */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "140px",
              height: "140px",
              backgroundColor: "rgba(247, 245, 239, 0.95)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "56px",
              color: "#637569",
              fontWeight: "bold",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            MP
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
