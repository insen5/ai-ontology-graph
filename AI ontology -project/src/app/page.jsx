"use client";
import React from "react";

function MainComponent() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [zoom, setZoom] = React.useState(300);
  const mermaidContainerRef = React.useRef(null);

  const graphDefinition = `graph LR
    %% Main Domain
    AI[Artificial Intelligence]
    
    %% First Level Split 
    AI --> TRAD[Traditional AI]
    AI --> ML[Machine Learning]
    AI --> APP[Applied Domains]
    
    %% Traditional AI
    TRAD --> SYM[Symbolic AI]
    TRAD --> LOG[Logic & Reasoning]
    
    SYM --> KR[Knowledge Representation]
    KR --> ONT[Ontologies]
    KR --> KG[Knowledge Graphs]
    KR --> ES[Expert Systems]
    
    %% Applications of Traditional AI
    ES -.-> |used in| MED1[Medical Diagnosis]
    ES -.-> |used in| FIN1[Financial Planning]
    
    %% Machine Learning Core
    ML --> CML[Classical ML]
    ML --> DL[Deep Learning]
    ML --> RL[Reinforcement Learning]
    
    %% Deep Learning Branches
    DL --> DIS[Discriminative Models]
    DL --> GEN[Generative Models]
    
    %% Discriminative Models
    DIS --> CNN[CNNs]
    CNN --> CNNM[CNN Models]
    CNNM --> RES[ResNet]
    CNNM --> VGG[VGG]
    CNNM --> EFF[EfficientNet]
    CNNM --> DEN[DenseNet]
    
    DIS --> RNN[RNNs]
    RNN --> LSTM[LSTM]
    RNN --> GRU[GRU]
    RNN --> BiRNN[Bidirectional RNN]
    
    %% Classical ML Details
    CML --> SUP[Supervised Learning]
    CML --> UNS[Unsupervised Learning]
    
    %% Supervised Learning Branch
    SUP --> CLA[Classification]
    SUP --> REG[Regression]
    
    CLA --> TREE[Tree-Based Methods]
    TREE --> DT[Decision Trees]
    TREE --> RF[Random Forests]
    TREE --> XGB[XGBoost]
    TREE --> LGBM[LightGBM]
    TREE --> CAT[CatBoost]
    
    CLA --> SVM[Support Vector Machines]
    CLA --> KNN[K-Nearest Neighbors]
    CLA --> NB[Naive Bayes]
    CLA --> LR[Logistic Regression]
    
    %% Applications of Classification
    CLA -.-> |used in| SPAM[Spam Detection]
    CLA -.-> |used in| FRAUD[Fraud Detection]
    
    REG --> LIN[Linear Methods]
    LIN --> LINR[Linear Regression]
    LIN --> RID[Ridge Regression]
    LIN --> LAS[Lasso]
    LIN --> EN[Elastic Net]
    
    REG --> NLIN[Non-Linear Methods]
    NLIN --> SVR[SVR]
    NLIN --> KRR[Kernel Ridge]
    
    %% Applications of Regression
    REG -.-> |used in| PRICE[Price Prediction]
    REG -.-> |used in| DEMAND[Demand Forecasting]
    
    %% Unsupervised Learning Branch
    UNS --> CLU[Clustering]
    UNS --> DRE[Dimensionality Reduction]
    UNS --> ARM[Association Rules]
    
    CLU --> KME[K-Means]
    CLU --> HCL[Hierarchical]
    CLU --> DBS[DBSCAN]
    CLU --> GMM[Gaussian Mixture]
    CLU --> SPE[Spectral Clustering]
    
    DRE --> PCA[PCA]
    DRE --> TSN[t-SNE]
    DRE --> UMP[UMAP]
    DRE --> AE[Autoencoders]
    
    %% Generative Models
    GEN --> TRF[Transformers]
    TRF --> LLM[Large Language Models]
    LLM --> BERT[BERT Family]
    LLM --> GPT[GPT Family]
    LLM --> T5[T5 Family]
    LLM --> LLAMA[LLaMA Family]
    
    GEN --> GANS[GANs]
    GANS --> DCGAN[DCGAN]
    GANS --> STGAN[StyleGAN]
    GANS --> CYGAN[CycleGAN]
    
    GEN --> DIF[Diffusion Models]
    DIF --> DDPM[DDPM]
    DIF --> SD[Stable Diffusion]
    DIF --> LDM[Latent Diffusion]
    
    %% Applications of Generative AI
    GANS -.-> |used in| SYNTH[Synthetic Data] 
    DIF -.-> |used in| IMG[Image Generation]
    
    %% Reinforcement Learning Branch
    RL --> MBR[Model-Based RL]
    RL --> MFR[Model-Free RL]
    RL --> DRL[Deep RL]
    
    MBR --> DYNA[Dyna]
    MBR --> PLAN[Planning]
    MBR --> AZ[AlphaZero]
    
    MFR --> QL[Q-Learning]
    MFR --> SAR[SARSA]
    MFR --> PG[Policy Gradient]
    
    DRL --> DQN[DQN]
    DRL --> PPO[PPO]
    DRL --> A3C[A3C]
    DRL --> SAC[SAC]
    
    %% Applications of RL
    RL -.-> |used in| ROBOT[Robotics]
    RL -.-> |used in| GAME[Game AI]
    
    %% Applied Domains
    APP --> CV[Computer Vision]
    APP --> NLP[Natural Language Processing]
    APP --> ROBOT[Robotics]
    APP --> REC[Recommender Systems]
    
    %% Cross-Domain Connections
    DL ==> |enables| CV
    DL ==> |enables| NLP
    RL ==> |used in| ROBOT
    CV ==> |supports| ROBOT
    DL ==> |powers| REC
    
    %% Real-World Applications 
    CV -.-> |used in| AV[Autonomous Vehicles]
    CV -.-> |used in| MV[Medical Imaging]
    NLP -.-> |used in| MT[Machine Translation]
    NLP -.-> |used in| CS[Customer Service]
    ROBOT -.-> |used in| MFG[Manufacturing]
    REC -.-> |used in| ECOM[E-Commerce]`;

  React.useEffect(() => {
    const loadMermaid = async () => {
      try {
        setIsLoaded(false);
        const mermaidModule = await import(
          "https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.esm.min.mjs"
        );

        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "default",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            diagramPadding: 8,
            nodeSpacing: 50,
            rankSpacing: 100,
            useMaxWidth: false,
          },
        });

        const { svg } = await mermaid.render(
          "flowchart-diagram",
          graphDefinition
        );

        if (mermaidContainerRef.current) {
          mermaidContainerRef.current.innerHTML = svg;

          const nodes = mermaidContainerRef.current.querySelectorAll(".node");
          nodes.forEach((node) => {
            node.style.cursor = "pointer";
            node.addEventListener("mouseenter", () => {
              node.style.filter = "brightness(1.2)";
            });
            node.addEventListener("mouseleave", () => {
              node.style.filter = "brightness(1)";
            });
          });
        }

        setIsLoaded(true);
        setError(null);
      } catch (err) {
        console.error("Error rendering flowchart:", err);
        setError(
          "Failed to render the ontology. Please try refreshing the page."
        );
      }
    };

    loadMermaid();
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 1600));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 20, 20));
  };

  const handleZoomReset = () => {
    setZoom(300);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <UnnamedProject
        title="AI Ontology"
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />

      <div className="flex-grow relative overflow-hidden">
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-700">Loading AI ontology...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center text-red-500 max-w-md p-4 bg-red-50 rounded-lg border border-red-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div
          className="w-full h-full overflow-auto p-4"
          style={{
            backgroundColor: "#fafafa",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div
            ref={mermaidContainerRef}
            className="flowchart-diagram block transform origin-top-left transition-transform duration-200"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
          ></div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 border-t border-blue-100">
        <div className="flex items-start text-sm text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>
            <strong>Tip:</strong> Use the zoom controls to navigate the
            ontology. Solid arrows (→) show direct relationships, dotted arrows
            (⇢) show "used in" relationships, and double arrows (⇒) show
            cross-domain connections.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .flowchart-diagram svg {
          width: auto !important;
          height: auto !important;
          min-height: 500px;
          max-height: calc(100vh - 150px);
        }
        
        .flowchart-diagram .node rect,
        .flowchart-diagram .node circle,
        .flowchart-diagram .node ellipse,
        .flowchart-diagram .node polygon,
        .flowchart-diagram .node path {
          fill: #f0f8ff;
          stroke: #2563eb;
          stroke-width: 1.5px;
        }
        
        .flowchart-diagram .edgePath .path {
          stroke: #4b5563;
          stroke-width: 1.5px;
        }
        
        .flowchart-diagram .edgeLabel {
          background-color: #ffffff;
          padding: 2px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .flowchart-diagram .node text {
          font-size: 12px;
          font-family: 'Arial', sans-serif;
          fill: #1f2937;
        }
        
        .flowchart-diagram .cluster rect {
          fill: #f3f4f6;
          stroke: #d1d5db;
          stroke-width: 1px;
          rx: 5px;
          ry: 5px;
        }
        
        .flowchart-diagram .label {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;