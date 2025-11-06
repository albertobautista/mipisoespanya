import { ImageResponse } from "next/og";
import { getCityBySlug } from "@/app/data/cities";

export const runtime = "edge";
export const alt = "Mi Piso España - Alquiler en la ciudad";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);

  if (!city) {
    // Imagen por defecto si no se encuentra la ciudad
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f7f5ef",
            backgroundImage:
              "linear-gradient(135deg, #aab257 0%, #8b924a 50%, #637569 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "rgba(247, 245, 239, 0.95)",
              borderRadius: "24px",
              padding: "60px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#637569",
                margin: "0",
                fontFamily: "system-ui",
              }}
            >
              Mi Piso España
            </h1>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7f5ef",
          backgroundImage:
            "linear-gradient(135deg, #aab257 0%, #8b924a 50%, #637569 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(247, 245, 239, 0.95)",
            borderRadius: "24px",
            padding: "50px 70px",
            margin: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            width: "90%",
            maxWidth: "1000px",
          }}
        >
          {/* Contenido principal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#8b924a",
                fontWeight: "500",
                marginBottom: "12px",
                fontFamily: "system-ui",
              }}
            >
              Mi Piso España
            </div>

            <h1
              style={{
                fontSize: "54px",
                fontWeight: "bold",
                color: "#637569",
                margin: "0 0 16px 0",
                fontFamily: "system-ui",
              }}
            >
              {city.name}
            </h1>

            <p
              style={{
                fontSize: "22px",
                color: "#8b924a",
                margin: "0 0 24px 0",
                fontFamily: "system-ui",
              }}
            >
              Encuentra tu hogar ideal • {city.population.toLocaleString()}{" "}
              habitantes
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              {city.bestNeighborhoods.slice(0, 3).map((neighborhood, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#aab257" : "#8b924a",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {neighborhood}
                </div>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "40px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                backgroundColor: "#637569",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              MP
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
