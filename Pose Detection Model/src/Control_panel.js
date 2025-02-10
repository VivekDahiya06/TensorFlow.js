// Control_panel.js
import GUI from 'lil-gui';

export default function Control_panel(model, detectorConfig, setModel) {

    const gui = new GUI();
    gui.add({ Model: 'BlazePose' }, 'Model', ['BlazePose', 'MoveNet', 'PoseNet'])
        .name('Model')
        .onChange((name) => {
            let selectedModel;
            switch (name) {
                case "MoveNet":
                    selectedModel = model.SupportedModels.MoveNet;
                    console.log("Model selected: MoveNet");
                    break;
                case "PoseNet":
                    selectedModel = model.SupportedModels.PoseNet;
                    console.log("Model selected: PoseNet");
                    break;
                default:
                    selectedModel = model.SupportedModels.BlazePose;
                    console.log("Model selected: BlazePose");
                    break;
            }
            setModel(selectedModel);
        });

    gui.close();
}